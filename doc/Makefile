DOC_NAME := proyecto
DOC := $(DOC_NAME).pdf

all: $(DOC) clean

# Generate pdf document
$(DOC): $(DOC_NAME).tex
	pdflatex $< $* && pdflatex $< && pdflatex $<

# Spell checker
spellcheck:
	bash ./../scripts/spell_check.sh

# install spell checker
install-spellcheck:
	bash ./../scripts/spell_install.sh

clean:
	find . -name "*.aux" -type f -delete
	rm -f $(DOC_NAME).toc $(DOC_NAME).out $(DOC_NAME).lot $(DOC_NAME).log $(DOC_NAME).lof $(DOC_NAME).ind $(DOC_NAME).ilg $(DOC_NAME).fls $(DOC_NAME).fdb_latexmk $(DOC_NAME).brf $(DOC_NAME).blg $(DOC_NAME).bbl $(DOC_NAME).idx
